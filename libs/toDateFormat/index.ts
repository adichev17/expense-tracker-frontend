import moment from "moment";

function toDateFormat(dateString: string): string {
  return moment(new Date(dateString)).format("l");
}

export default toDateFormat;
