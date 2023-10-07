import React from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import qs from "qs";

export function TeamCard({ member }) {
  const memberParams = member
    ? qs.stringify({
        recordId: member,
      })
    : null;

  const {
    data: registered,
    error: registeredDataError,
    isLoading: registeredDataLoading,
  } = useSWR(memberParams ? `api/registered` : null, (url) => fetcher(url));
  console.log(registered);
  return (
    <div>
      <div></div>
    </div>
  );
}
