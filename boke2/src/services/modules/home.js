import hyRequest from "..";
// Get validation code
export function getCode(data) {
  return hyRequest.post({
    url: "/api/user/getCode",
    data: data,
  });
}

// Registration
export function register(data) {
  return hyRequest.post({
    url: "/api/user/register",
    data: data,
  });
}

// log in
export function login(data) {
  return hyRequest.post({
    url: "/api/user/login",
    data: data,
  });
}

// Get user information
export function findUserById(id) {
  return hyRequest.get({
    url: "/api/user/findUserById/" + id,
  });
}

// modify user information
export function updateUserById(data) {
  return hyRequest.post({
    url: "/api/user/updateUserById",
    data: data,
  });
}

// Add posts
export function addpost(data) {
  return hyRequest.post({
    url: "/api/post/add",
    data: data,
  });
}

// Get post list
export function listpost(data) {
  return hyRequest.post({
    url: "/api/post/search",
    data: data,
  });
}

export function getPost(id) {
  return hyRequest.get({
    url: "/api/post/getPost/" + id,
  });
}


// Get posts in bookmarks
export function collectionAndlike(data) {
  return hyRequest.post({
    url: "/api/post/collectionAndlike ",
    data: data,
  });
}

export function focus(data) {
  return hyRequest.post({
    url: "/api/post/focus",
    data: data,
  });
}

export function notice(data) {
  return hyRequest.post({
    url: "/api/post/notice",
    data: data,
  });
}
export function getMessageList(data) {
  return hyRequest.post({
    url: "/api/post/getMessageList",
    data: data,
  });
}
export function sendMessage(data) {
  return hyRequest.post({
    url: "/api/post/sendMessage",
    data: data,
  });
}

export function getMessage(id) {
  return hyRequest.get({
    url: "/api/post/getMessage/" + id,
  });
}

// Comment

export function comment(data) {
  return hyRequest.post({
    url: "/api/post/comment",
    data: data,
  });
}

