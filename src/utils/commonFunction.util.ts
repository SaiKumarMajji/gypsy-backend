
export function transformQuery(data: any): any {
  if (!data) return null;

  const result: any = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let value = data[key];

      if (typeof value === "string") {
        try {
          const parsedValue = JSON.parse(value);
          if (typeof parsedValue === "object" && parsedValue !== null) {
            value = parsedValue;
          }
        } catch (error) {
          /* empty */
        }
      }

      if (!isNaN(value) && typeof value === "string") {
        value = parseInt(value, 10);
      }

      result[key] = value;
    }
  }
  return result;
}

export function ObjectConvert(data: any): any {
  if (Array.isArray(data)) {
    return data.map(item => {
      return typeof item === "string" && !isNaN(Number(item))
        ? Number(item)
        : ObjectConvert(item);
    });
  } else if (data !== null && typeof data === "object") {
    return Object.keys(data).reduce((acc: any, key) => {
      const value = data[key];
      // ObjectConvert function turns the login_url as number, if the Login UTR is type string , then only Login URL may begin with 0
      if (key == "login_url") {
        acc[key] = value;
      } else if (typeof value === "object" && value !== null) {
        acc[key] = ObjectConvert(value);
      } else if (
        typeof value === "string" &&
        value !== "" &&
        !isNaN(Number(value))
      ) {
        acc[key] = Number(value);
      } else if (value === "true") {
        acc[key] = true;
      } else if (value === "false") {
        acc[key] = false;
      } else if (value === "null" || value === "") {
        acc[key] = null;
      } else {
        acc[key] = value;
      }

      return acc;
    }, {});
  }
  return data;
}




