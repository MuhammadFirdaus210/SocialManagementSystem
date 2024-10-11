import { Link } from 'react-router-dom';

const Breadcrumb = ({items}) => {
  
  return (
    <>
    <nav className="text-lg font-medium text-gray-500" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return isLast ? (
            <li key={index} className="inline-flex items-center text-[#043B64]">
              {item.label}
            </li>
          ) : (
            <li key={index} className="inline-flex items-center cursor-pointer ">
              <Link to={item.path} className="text-gray-500 hover:text-[#043B64]">
                {item.label}
              </Link>
              <span className="mx-2 text-gray-400">{">"}</span>
            </li>
          );
        })}
      </ol>
    </nav>
     <div className="w-full border border-b-0 my-2"></div>
    </>
     
  );
};

export default Breadcrumb;
