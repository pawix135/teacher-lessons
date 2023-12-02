import { Teacher } from "../@types/teacher";

let POST_OPTIONS = (body: object) => {
  return {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json;",
    },
  };
};

let GET_OPTIONS = {
  method: "GET",
};

export const fetchTeachers = (
  callback: (data: { ok: boolean; teachers: Teacher[] }) => void
) => {
  fetch("/api/getTeachers", GET_OPTIONS)
    .then((response) => response.json())
    .then((data) => callback(data));
};

export const fetchFlaggedReviews = (
  callback: (data: { ok: boolean; reviews: UserReview[] }) => void,
  teacherId: number
) => {
  fetch("/api/admin/getFlaggedReviews", POST_OPTIONS({ teacherId }))
    .then((response) => response.json())
    .then((data) => callback(data));
};
