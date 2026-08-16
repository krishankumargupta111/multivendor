import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../redux/store";

export default function GridTable() {
  const homeCategories = useAppSelector(
    (store) => store.homeCategory.homeCategories
  );

  return (
    <HomeCategoryTable
      categories={homeCategories.grid}
    />
  );
}