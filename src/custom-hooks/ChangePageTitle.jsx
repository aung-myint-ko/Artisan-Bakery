import { useEffect, useState } from "react";

const useDocumentTitle = (title) => {
  const [document_title, setDoucmentTitle] = useState(title);
  useEffect(() => {
    document.title = `${document_title} | Artisan Bakery`;
  }, [document_title]);

  return [document_title, setDoucmentTitle];
};

export default useDocumentTitle;
