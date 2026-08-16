import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../redux/store";

function ElectronicsTable() {
  const homeCategories = useAppSelector(
    (store) => store.homeCategory.homeCategories
  );

  return (
    <div>
      <HomeCategoryTable
        categories={homeCategories.electricCategories}
      />
    </div>
  );
}

export default ElectronicsTable;