const DateComponent = ({ dateString }: { dateString: string }) => {
  const d = new Date(Date.parse(dateString));
  const t = new Intl.DateTimeFormat(['no', 'nb']).format(d)
  return (<>{t}</>);
};

export default DateComponent;