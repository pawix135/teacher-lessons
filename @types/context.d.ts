interface AppContext {
  state: {
    alert: Alert;
    code: string;
    isFetching: boolean;
    isValidated: boolean;
    review: UserReview;
  };
  setCode: any;
  setAlert: (t: Alert) => void;
  setReview: any;
  setIsFetching: any;
  setIsValidated: any;
  addReview: () => any;
  checkCode: () => Promise<ICode>;
}

interface Alert {
  message: string;
  active: boolean;
  type: AlertErrorType;
}

type AlertErrorType = "ERROR" | "SUCCESS";

interface UserReview {
  id?: number;
  name: string;
  image?: string;
  created_at: Date;
  flagged: boolean;
  review: string;
  teacherId?: number | null;
  reviewAdded?: boolean;
}

interface AdminGetterContext {
  reviews: UserReview[] | [];
  name: string;
  teacherId: number;
}

interface AdminSetterContext {
  setReviews: any;
  setName: any;
  setTeacherId: any;
}
