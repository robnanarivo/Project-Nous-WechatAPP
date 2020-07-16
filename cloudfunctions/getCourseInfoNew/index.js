// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const studentApp = db.collection("studentApp");
  const courseList = db.collection("courseList");
  const courseSelection = db.collection("courseSelection");

  // studentInfo
  let app = await studentApp.where({
    _openid: wxContext.OPENID,
  })
    .limit(1)
    .get();
  let studentInfo = {
    venue: app.data[0].venue,
    studentName: app.data[0].name,
    studentAppID: app.data[0]._id,
  }

  // courseInfo
  let courseInfo = await courseList.where({
    venue: app.data[0].venue
  }).get();
  let courseInfoAM = courseInfo.data.filter(obj => {
    return (obj.time === "AM")
  });
  let courseInfoPM = courseInfo.data.filter(obj => {
    return (obj.time === "PM")
  });

  // spots taken
  let spotsAM_obj = await courseSelection.aggregate()
    .match({
      venue: studentInfo.venue
    })
    .sortByCount(`$courseSelected.AM.courseID`)
    .end();
  let spotsAM_map = spotsAM_obj.list.reduce(function(map, obj) {
    map[obj._id] = obj.count;
    return map;
  }, {});
  for (let course of courseInfoAM) {
    if (spotsAM_map.hasOwnProperty(course.courseID)) {
      course.spotsTaken = spotsAM_map[course.courseID];
    } else {
      course.spotsTaken = 0;
    }
  }

  let spotsPM_obj = await courseSelection.aggregate()
    .match({
      venue: studentInfo.venue
    })
    .sortByCount(`$courseSelected.PM.courseID`)
    .end();
  let spotsPM_map = spotsPM_obj.list.reduce(function(map, obj) {
    map[obj._id] = obj.count;
    return map;
  }, {});
  for (let course of courseInfoPM) {
    if (spotsPM_map.hasOwnProperty(course.courseID)) {
      course.spotsTaken = spotsPM_map[course.courseID];
    } else {
      course.spotsTaken = 0;
    }
  }

  let courseInfoAM_valid = {};
  let courseInfoPM_valid = {};
  if (studentInfo.venue === "长沙") {
    courseInfoAM_valid = courseInfoAM.filter(obj => {
      return (obj.spotsTaken < 15)
    });
    courseInfoPM_valid = courseInfoPM.filter(obj => {
      return (obj.spotsTaken < 15)
    });
  } else {
    courseInfoAM_valid = courseInfoAM.filter(obj => {
      return (obj.spotsTaken < 12)
    });
    courseInfoPM_valid = courseInfoPM.filter(obj => {
      return (obj.spotsTaken < 12)
    });
  }

  return {
    event,
    studentInfo,
    courseInfoAM_valid,
    courseInfoPM_valid,
  }
}