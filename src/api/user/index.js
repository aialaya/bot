//   导入接口模块
import { api  } from '../../nextwork/index.js';

// 获取登录token

export const login = data => api.post("/api/v1/login", data);

// 获取用户信息
export const userinfo = () => api.get("/api/v1/info" );

// 获取答题信息
export const getAnswers = () => api.get("/api/v1/ask/info");

// 获取积分记录
export const getRecord = (page) => api.get("/api/v1/integral/record",{page:page});

// 转盘抽奖
export const postTurning = () => api.post("/api/v1/turning/luck-draw");

// 获取转盘数据
export const getTurningList = () => api.get("/api/v1/turning/list");

// 提交答案
export const postAnswer = data => api.post("/api/v1/ask/save", data);

// 申请提现
export const postWithDrawal = data => api.post("/api/v1/withdrawal/submit", data);

// 获取任务列表
export const getTask = (page) => api.get("/api/v1/task/list",{page:page});

// 领取任务
export const postTask = data => api.post("/api/v1/task/save", data);

// 签到
export const postUpdate = data => api.post("/api/v1/activity/signin", data);


