import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../redux/store";

export default function GridTable() {
  const categories = useAppSelector(
    (store) => store.homeCategory.categories
  );

  return (
    <HomeCategoryTable categories={categories} />
  );
}