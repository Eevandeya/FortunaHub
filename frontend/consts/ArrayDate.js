const date = new Date();

const ArrayDate = [];
for (let i = 0; i < 60; i++) {
  date.setDate(date.getDate() + 1);
  ArrayDate.push(date.toISOString().split('T')[0]);
}
export default ArrayDate;
