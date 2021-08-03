export enum Status {
  approved = "approved",
  pending = "pending",
  rejected = "rejected",
}

export const STATUSES = Object.values(Status);

export default { Status, STATUSES };
