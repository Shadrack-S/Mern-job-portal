import React from "react";
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa6'
function Newsletter() {
    return (

        <div>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 ">
                <FaEnvelopeOpenText />
                Email me for Jobs !</h3>
            <p className="text-primary/75 text-base mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus beatae cum
                rem autem laudantium delectus, ipsa reprehenderit quasi, culpa adipisci excepturi dolor eos, sunt hic?</p>

            <div className="w-full space-y-4">
                <input type="email" name="email" id="email" placeholder="name@email.com"
                    className="w-full block py-2 pl-2 border focus:outline-none" />
                <input type="submit" value={'Subscribe'}
                    className="w-full block py-2 pl-2 border focus:outline-none bg-blue text-white rounded-sm cursor-pointer font-semibold" />
            </div>


            {/* 2ND part */}
            <div className="mt-20">
            <h3 className="text-lg font-bold mb-2  flex items-center gap-2 ">
                <FaRocket />
                Get noticed faster </h3>
            <p className="text-primary/75 text-base mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus beatae cum rem autem </p>

            <div className="w-full space-y-4">

                <input type="submit" value={'Upload CV'}
                    className="w-full block py-2 pl-2 border focus:outline-none bg-blue text-white rounded-sm cursor-pointer font-semibold" />
            </div>
            </div>


        </div>
    )
}
export default Newsletter