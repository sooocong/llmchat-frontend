
export const NewHeader = () => {
    return (
        <div className="w-full h-[74px] relative bg-gradient-to-r to-[100%] from-[#30ABCE] to-[#01A27A] flex justify-between items-center">
            <div className='w-auto h-full relative left-[7%] flex gap-[25px]'>
                <div className='line w-[2px] h-[130%] bg-white origin-top rotate-[55deg] opacity-[0.6]'></div>
                <div className='line w-[2px] h-[130%] bg-white origin-top rotate-[55deg] opacity-[0.6]'></div>
                <div className='line w-[2px] h-[130%] bg-white origin-top rotate-[55deg] opacity-[0.6]'></div>
            </div>
            <h1 className="text-white font-bold text-2xl tracking-[4px]">AEROCHAT</h1>
            <div className='w-auto h-full relative right-[7%] bottom-0 flex gap-[25px] items-end'>
                <div className='line w-[2px] h-[130%] bg-white origin-bottom rotate-[55deg] opacity-[0.6]'></div>
                <div className='line w-[2px] h-[130%] bg-white origin-bottom rotate-[55deg] opacity-[0.6]'></div>
                <div className='line w-[2px] h-[130%] bg-white origin-bottom rotate-[55deg] opacity-[0.6]'></div>
            </div>
        </div>
    );
};