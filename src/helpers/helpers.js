const formatNumber = (val, decimalPlace = 2) => {
  const numericValue = Number(val);
  if (isNaN(numericValue)) return val;

  const roundedVal = Number(numericValue.toFixed(decimalPlace));
  const formattedVal = roundedVal.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlace,
    maximumFractionDigits: decimalPlace,
  });

  return formattedVal;
};

const formatDatetime = (dateTime, type = "datetime") => {
  const newDate = new Date(dateTime);
  const year = newDate.getFullYear();
  const month = newDate
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const day = newDate.getDate().toString().padStart(2, "0");

  if (type === "date") return `${year}-${month}-${day}`;

  const hours = newDate.getHours().toString().padStart(2, "0");
  const minutes = newDate.getMinutes().toString().padStart(2, "0");
  const seconds = newDate.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

const strDate2UtcDate = (datetime) => {
  const date = new Date(datetime);
  const tzOffset = date.getTimezoneOffset();
  const utcDate = new Date(date.getTime() + tzOffset * 60 * 1000);

  return utcDate;
};

const str2DatetimeInput = (datetime, type = "datetime") => {
  const date = new Date(datetime);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  let formattedDate = `${year}-${month}-${day}`;
  if (type === "datetime") formattedDate += `T${hours}:${minutes}`;
  return formattedDate;
};

const isCurrentApprover = (approverList, user) => {
  if (!approverList) return false;

  const approverIndex = approverList.findIndex(
    (al) => al.username === user.username
  );

  if (approverIndex === -1) return false;
  else if (approverIndex === 0) {
    const apprData = approverList[approverIndex];
    if (apprData && apprData.status === "none") {
      return true;
    } else return false;
  } else if (approverIndex > 0) {
    const apprData = approverList[approverIndex];
    const prevApprData = approverList[approverIndex - 1];

    if (
      prevApprData &&
      apprData &&
      prevApprData.status === "approved" &&
      apprData.status === "none"
    ) {
      return true;
    } else return false;
  } else return false;
};

const getGoogleMapsAddress = async (lat, long) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${
        import.meta.env.VITE_APP_GMAP_HOST
      }`
    );

    if (response.ok) {
      const data = await response.json();
      const addressData = data.results[0];
      return addressData;
    }
  } catch (error) {
    console.error("Error fetching address details:", error);
  }
};

export default {
  formatNumber,
  formatDatetime,
  strDate2UtcDate,
  str2DatetimeInput,
  isCurrentApprover,
  getGoogleMapsAddress,
};
