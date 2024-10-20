

function Nav({ cartCount, handleModalToggle }) {
    return (
        <nav className='border-b-2 shadow flex flex-wrap justify-around items-center p-6 text-2xl border-purple-400'>
            
            <div className="font-semibold text-3xl ">
            ALibaba Store
            </div>
            <div className='flex justify-center hover:scale-105' onClick={handleModalToggle}>
                <span className='border h-5 w-5 flex justify-center items-center rounded-full text-sm bg-purple-600 hover:bg-blue-500 focus:bg-red-500 text-white -ms-3'>
                    {cartCount} 
                </span>
                Cart
            </div>
        </nav>
    );
}

export default Nav;