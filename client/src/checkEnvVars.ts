const varsToCheck: string[] = ["REACT_APP_SERVER"];

export default function () {
  varsToCheck.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw Error(`Please add ${envVar} env variable`);
    }
  });
}
