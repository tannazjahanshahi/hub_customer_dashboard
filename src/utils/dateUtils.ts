import moment from "moment-jalaali";

// Configure moment-jalaali
moment.loadPersian({ usePersianDigits: false, dialect: "persian-modern" });

export const formatPersianDate = (date: string | Date): string => {
  return moment(date).format("jYYYY/jMM/jDD HH:mm");
};

export const formatPersianDateShort = (date: string | Date): string => {
  return moment(date).format("jYYYY/jMM/jDD");
};

export const getCurrentPersianDate = (): string => {
  return moment().format("jYYYY/jMM/jDD HH:mm");
};

export {}; // To make it a module
