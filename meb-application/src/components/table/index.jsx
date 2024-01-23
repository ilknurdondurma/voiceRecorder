import React, { useMemo, useState } from 'react';
import { TbArrowsSort } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Table = ({ data, columns , initialSort }) => {
  const initialSortColumn =initialSort;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { sortedData, sortByColumn } = useSortableData(data,initialSortColumn);

  const colorPalette = ['#d1d5db'];
  let colorIndex = 0;

  const getRandomColor = () => {
    const currentColor = colorPalette[colorIndex];
    colorIndex = (colorIndex + 1) % colorPalette.length;
    return currentColor;
  };

  // Sayfa değiştirme işlevi
  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  // Sayfa sayısını hesapla
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Sayfaya göre görüntülenecek veriyi al
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = sortedData.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto sm:mx-5 rounded-lg">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-black/90 text-white">
            {columns.map((column, index) => (
              <th key={index} className="border  py-2 px-4 h-16">
                <div className="flex items-center">
                  {column.label}
                  <button onClick={() => sortByColumn(column.key)} className="ml-2 p-1  rounded">
                    <TbArrowsSort />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleData.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white h-14">
              {columns.map((column) => (
                <td key={column.key} className="border-y-2 border-y-gray-300 py-2 px-4 relative">
                  <div className="">
                    {column.key === 'appName' ? (
                      <Link to={`/rapor/${row['id']}`} className="text-primary hover:underline">
                        <span
                          className="text-black hover:underline"
                          style={{
                            backgroundColor: getRandomColor(),
                            padding: '10px',
                            width: '100%',
                            borderRadius: '5px',
                            display: 'inline-block',
                          }}
                        >
                          {row[column.key]}
                        </span>
                      </Link>
                    ) : (
                      row[column.key]
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        {sortedData.length > itemsPerPage && (
          <>
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-black text-white px-4 py-2 mr-2 rounded"
            >
              Önceki Sayfa
            </button>
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Sonraki Sayfa
            </button>
          </>
        )}
      </div>
    </div>
  );
};
  
  const useSortableData = (items, initialSortBy) => {
    const [sortBy, setSortBy] = useState(initialSortBy);
    const [sortDesc, setSortDesc] = useState(false);
  
    const sortedData = useMemo(() => {
      const sortedItems = [...items].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
  
        // Eğer sayısal bir karşılaştırma mümkünse, sayısal sıralama yap
        if (!isNaN(aValue) && !isNaN(bValue)) {
          const numericComparison = (parseFloat(aValue) || 0) - (parseFloat(bValue) || 0);
          return sortDesc ? -numericComparison : numericComparison;
        } else {
          // Eğer sayısal bir karşılaştırma mümkün değilse, string sıralama yap
          return sortDesc ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
        }
      });
  
      return sortedItems;
    }, [items, sortBy, sortDesc]);
  
    const sortByColumn = (key) => {
      if (key === sortBy) {
        setSortDesc(!sortDesc);
      } else {
        setSortBy(key);
        setSortDesc(false);
      }
    };
  
    return { sortedData, sortByColumn, initialSortBy };
  };
  
  
  

export default Table;

