import classNames from "classnames";

type TableProps = {
  tableData: { [key: string]: boolean | string };
  className?: String;
};

export default function Table(props: TableProps) {
  const { tableData, className } = props;

  return <div className={classNames("grid-container", className)}>TO DO</div>;
}
