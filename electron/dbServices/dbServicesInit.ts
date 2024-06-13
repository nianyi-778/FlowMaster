import { dbConnectionHand } from "./db/dbInit";

export const mainInitHand = async () => {
  await dbConnectionHand();
};
