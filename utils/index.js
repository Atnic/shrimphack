export function redirectToHomepage() {
  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  };
}

export function CurrencyConverter(value, currency, digits) {
  if (currency) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: currency,
    }).format(value);
  }
  return new Intl.NumberFormat("id-ID", {
    maximumSignificantDigits: digits || 2,
  }).format(value);
}

export function DateConverter(value) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(Date.parse(value));
}

export function DateMonthConverter(value) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    month: "long",
  }).format(Date.parse(value));
}

export function DateMonthShortConverter(value) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    month: "short",
  }).format(Date.parse(value));
}

export function DateNumericConverter(value) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    day: "numeric",
  }).format(Date.parse(value));
}

export function TimeConverter(value) {
  return new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(Date.parse(value));
}
