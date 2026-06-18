import ProductForm from "@/components/manager/ProductForm";
import ProductList from "@/components/manager/ProductManagement";
import ProductDetail from "@/components/ProductDetail";
import { useState } from "react";

export default function ProductsPage() {
  const [view, setView] = useState("list");
  const [selected, setSelected] = useState(null);

  function handleBack() {
    setView("list");
    setSelected(null);
  }

  if (view === "create") return <ProductForm onBack={handleBack} />;
  if (view === "edit" && selected)
    return <ProductForm product={selected} onBack={handleBack} />;
  if (view === "detail" && selected)
    return (
      <ProductDetail
        product={selected}
        onBack={handleBack}
        onEdit={(p) => {
          setSelected(p);
          setView("edit");
        }}
      />
    );

  return (
    <ProductList
      onCreateProduct={() => setView("create")}
      onEditProduct={(p) => {
        setSelected(p);
        setView("edit");
      }}
      onViewProduct={(p) => {
        setSelected(p);
        setView("detail");
      }}
    />
  );
}
