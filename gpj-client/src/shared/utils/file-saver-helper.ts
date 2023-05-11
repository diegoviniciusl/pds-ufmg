import FileSaver from 'file-saver';

const saveCsvFile = (rawFileContent: string, name: string) => {
  const file = new Blob([rawFileContent], { type: 'text/csv;charset=utf-8' });
  FileSaver.saveAs(file, `${name}.csv`);
};
const fileSeverHelper = {
  saveCsvFile,
};

export default fileSeverHelper;
