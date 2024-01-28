export const convertedDate = (timestamp) => {
    const dateTimeOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false, // 24 saat formatında
    };
  
    return new Date(timestamp).toLocaleString(undefined, dateTimeOptions);
  };