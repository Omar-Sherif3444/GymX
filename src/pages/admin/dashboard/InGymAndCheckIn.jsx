import { checkInMembers } from "../../../context/checkInsData";

export const insideNow = (checkIns) =>
  checkIns.filter((c) => c.status === "Success" && !c.checkedOut);

//will add time inside later

export const codeOf = (checkIn) =>
  checkInMembers.find((m) => m.id === checkIn.memberId)?.code;
