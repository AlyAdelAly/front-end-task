import { FaHome } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { CgSortAz } from 'react-icons/cg';
import millify from 'millify';
import Pagination from './pagination';
import Image from 'next/image';
import FsLightbox from "fslightbox-react";
import ImageNotFound from '../assests/imageNotFound.jpeg'

const Dashboard = () => {

    const [units, setUnits] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [unitsPerPage, setUnitsPerPage] = useState(5);
    const [toggler, setToggler] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    // Fetching Data From API
    const getUnitsData = async () => {
        const data = await fetch(`http://localhost:3005/listings`)
        const res = await data.json();

        setUnits(res);
    }

    // Filtering Data By UnitId
    const filterById = async (unitId: any) => {
        const data = await fetch(`http://localhost:3005/listings?unit_id=${unitId}`)
        const res = await data.json();

        setUnits(res);
    }

    // Sorting Data By Units Type (unit id , unit type , unit price) 
    const sortBy = async (type: any) => {
        const data = await fetch(`http://localhost:3005/listings?_sort=${type}`)
        const res = await data.json();

        setUnits(res);
    }

    useEffect(() => {
        getUnitsData();
    }, []);

    // Get Current Units
    const indexOfLastPost = currentPage * unitsPerPage;
    const indexOfFirstPost = indexOfLastPost - unitsPerPage;
    const currentUnits = units.slice(indexOfFirstPost, indexOfLastPost);

    // Change Page
    const paginate = (pageNumber: any) => {
        setCurrentPage(pageNumber)
    };

    return (
        <div className='felx flex-col items-start justify-center px-10 py-10 md:px-40 md:py-20 gap-6'>
            <h1 className='text-2xl'>Dashboard</h1>
            <div className='flex flex-col lg:flex-row w-auto h-auto bg-white rounded-sm my-3'>
                <FaHome size={20} className='pl-2 pt-2 text-gray-500' />
                <p className='text-xxs pl-3 pt-5px underline text-gray-500'>Home</p>
                <IoIosArrowForward size={20} className='pl-2 pt-2 text-gray-500' />
                <p className='text-xxs pl-3 pt-5px text-gray-400'>Dashboard</p>
            </div>
            <div className='flex flex-col lg:flex-row items-start'>
                <h3 className='font-bold text-md'>Filters by ID:</h3>
                <input onChange={(e) => { filterById(e.target.value) }} className="lg:ml-2 w-full lg:w-36 h-5 py-3 px-2 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="ex: 45785"></input>
                <div className='ml-auto flex flex-col lg:flex-row'>
                    <h3 className='text-sm font-semibold pr-1'>Sort by: </h3>
                    <Menu>
                        <MenuButton as={IconButton} icon={<CgSortAz size={20} />} variant='outline' color='red.400' />
                        <MenuList className='bg-white rounded-md'>
                            <MenuItem className='py-2 px-6 hover:bg-gray-200' onClick={() => sortBy('unit_id')}>Unit ID</MenuItem>
                            <MenuItem className='py-2 px-6 hover:bg-gray-200' onClick={() => sortBy('unit_type')}>Unit Type</MenuItem>
                            <MenuItem className='py-2 px-6 hover:bg-gray-200' onClick={() => sortBy('total_price')}>Unit Price</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
            <div className='overflow-auto'>
            <table className='border-2 border-gray-200 w-full mt-4'>
                <thead className='text-neutral-800'>
                    <tr className='bg-white'>
                        <th className='py-3'>Unit Id</th>
                        <th className='py-3'>Unit Type</th>
                        <th className='py-3'>Price</th>
                        <th className='py-3'>Build up area</th>
                        <th className='py-3'>For Sale</th>
                        <th className='py-3'>Gallery</th>
                    </tr>
                </thead>
                <tbody className='text-neutral-900 text-center font-medium'>
                    {
                        currentUnits.map((item: {_id: any, unit_id: any, unit_type: any, total_price:any, bua:any, for_sale: boolean, photos: any }) => (
                            <tr key={item._id} className='bg-gray-50'>
                                <td className='py-3 px-6 text-sm'>{item.unit_id}</td>
                                <td className='py-3 px-6 text-sm'>{item.unit_type}</td>
                                <td className='py-3 px-6 text-sm'>{millify(item.total_price)} EGP</td>
                                <td className='py-3 px-6 text-sm'>{item.bua} m<sup>2</sup></td>
                                <td className='py-3 px-6 text-xxs text-white'>
                                    {item.for_sale ?
                                        <button className='p-2 for-sale-button rounded-md tracking-widest'>FOR SALE</button>
                                        : <button className=' not-for-sale-button p-2 rounded-md tracking-widest'>NOT FOR SALE</button>
                                    }
                                </td>
                                <td className='py-3 text-sm'>
                                    {
                                        item.photos[0] ? 
                                        <Image onClick={() => { setSelectedRow(item); setToggler(!toggler) }} src={item.photos[0]} alt={'img'} width={40} height={40} className={'lg:ml-6'} /> :
                                        <Image src={ImageNotFound} className="w-10 h-10 lg:ml-6" alt="image not found" />
                                    }
                                    
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Pagination
                unitsPerPage={unitsPerPage}
                totalUnits={units.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            </div>
            <FsLightbox
                toggler={toggler}
                sources={selectedRow?.photos?.map(photo => photo)}
            />
        </div>
    );
};


export default Dashboard;