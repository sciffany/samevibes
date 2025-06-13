export default function GameScreen() {
  return (
    <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans'>
      <header className='bg-[#2e9ca9] text-white text-center py-4 text-xl font-semibold'>
        samevibes
      </header>

      <main className='max-w-md mx-auto p-6 space-y-6'>
        {/* Mission */}
        <div>
          <h2 className='font-bold text-lg'>Mission:</h2>
          <p>Hit yourself and Sophia, but not Yipin</p>
        </div>

        <hr className='border-t border-[#2e9ca9]' />

        {/* Prompt */}
        <div>
          <h3 className='font-semibold text-md'>
            What do you all have in common?
          </h3>
          <p className='text-sm text-gray-600'>They have learned this…</p>
        </div>

        {/* Answer input */}
        <input
          type='text'
          placeholder='A language or musical instrument'
          className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400'
        />

        {/* People targets */}
        <div className='space-y-2'>
          <div className='w-full border border-gray-300 rounded-md p-3 bg-white'>
            Yourself
          </div>
          <div className='w-full border border-gray-300 rounded-md p-3 bg-white'>
            Sophia
          </div>
          <div className='w-full border border-gray-300 rounded-md p-3 bg-white flex justify-between items-center'>
            <span>Yipin</span>
            <span className='text-red-500 text-xl'>🚫</span>
          </div>
        </div>
      </main>
    </div>
  );
}
