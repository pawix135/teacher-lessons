import React, { createContext, useState } from "react";

export const AdminContextState = createContext<AdminGetterContext | null>(null);
export const AdminContextUpdater = createContext<AdminSetterContext | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

const AdminContextProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [name, setName] = useState<string>("");
  const [reviews, setReviews] = useState<UserReview[] | []>([]);
  const [teacherId, setTeacherId] = useState<number>(1);

  const stateMemo: AdminGetterContext = {
    name,
    reviews,
    teacherId,
  };

  const updaterMemo: AdminSetterContext = {
    setName,
    setReviews,
    setTeacherId,
  };

  return (
    <AdminContextState.Provider value={stateMemo}>
      <AdminContextUpdater.Provider value={updaterMemo}>
        {children}
      </AdminContextUpdater.Provider>
    </AdminContextState.Provider>
  );
};

export default AdminContextProvider;
