import React from 'react';
import './Home.css';
import safe from '../../../Assets/Frame 29.png';
import divider from '../../../Assets/Frame 30.png';
import lock from '../../../Assets/mingcute_safe-lock-line.png';
import handshake from '../../../Assets/Frame 6.png';
import brain from '../../../Assets/Frame 6-1.png';
import dummy from '../../../Assets/Frame 31.png';
function Home() {
  return (
    <div className='container-fluid'>
        <div className='home-hero'>

        </div>
        <div className='container text-center'>
            <div className="row">
                <div className="col-12 home-heading m-5">
                     We Are
                </div>
            </div>
            <div className='row'>
                <div className="col-12 home-para m-5">
                 Haven is your confidential online oasis, built to empower you to break free from the grip of domestic abuse. Here, you'll find:
                </div>
            </div>
            <div className='row'>
                <div className='col-12 text-white m-5'>
                    <button type='button' className='btn bg-theme text-white btn-lg rounded-pill px-5'>Know more</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <div className='row'>
                        <div className='col-12 home-inner-para m-5'>
                            Find peace and support. Leave abuse behind.
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 home-para m-5'>
                        Haven is your confidential online sanctuary, empowering you to break free from domestic abuse.
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 m-5'>
                            <button type='button' className='btn bg-theme text-white btn-lg rounded-pill px-5 '>Know more</button>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <img src={safe} className='img-fluid mx-5' alt='safe'/>
                </div>
            </div>
            
        </div>
        <img src={divider} className='img-fluid'/>
        <div className='container text-center'>
            <div className="row">
                <div className="col-12 home-heading m-5">
                Features
                </div>
            </div>
            <div className='row'>
                <div className="col-12 home-para m-5">
                Highlight powerful, anonymous stories of survivors who found support and strength at Haven.
                </div>
            </div>
            <div className='row m-5'>
                <div className='col'>
                    <div className='row'>
                        <div className='col'>
                            <img src={lock} className='img-fluid mx-5' alt='lock'/>
                        </div>
                        <div className='col'>
                            <img src={handshake} className='img-fluid mx-5' alt='handshake'/>
                        </div>
                        <div className='col'>
                            <img src={brain} className='img-fluid mx-5' alt='brain'/>
                        </div>
                        <div className='col'>
                            <img src={lock} className='img-fluid mx-5' alt='lock'/>
                        </div>
                    </div>
                    <div className='row home-para'>
                        <div className='col'>
                            Safety First
                        </div>
                        <div className='col'>
                            Get Help
                        </div>
                        <div className='col'>
                            Learn
                        </div>
                        <div className='col'>
                            Empower
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 text-white my-5'>
                    <button type='button' className='btn bg-theme text-white btn-lg rounded-pill px-5'>Know more</button>
                </div>
            </div>
            <div className='row m-5'>
                <div className='col-6'>
                    <div className='row'>
                        <div className='col-12 home-heading m-5'>
                            For Friends and Family
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 home-para mx-5'>
                            Provide information on recognizing abuse, supporting survivors, and finding help. For Professionals: 
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <svg  xmlns="http://www.w3.org/2000/svg" width="63" height="64" viewBox="0 0 63 64" fill="none"><g clip-path="url(#clip0_2_34)"><path d="M31.5 63.0378C14.1022 63.0378 0 48.9357 0 31.5378C0 14.14 14.1022 0.0378418 31.5 0.0378418C48.8978 0.0378418 63 14.14 63 31.5378C63 48.9357 48.8978 63.0378 31.5 63.0378ZM53.1346 44.6714V19.7214L31.4705 7.24347L31.4409 7.25922L9.85163 19.7352V44.6792L31.4587 57.1257L31.4606 57.1277L53.1326 44.6733L53.1346 44.6714ZM43.5468 40.6827L39.8514 38.5643L31.6063 43.3503C31.5824 43.3644 31.5553 43.3718 31.5276 43.3718C31.4999 43.3718 31.4727 43.3644 31.4488 43.3503L21.989 37.8674L21.985 28.3288L13.6749 23.5644L31.3898 13.1792C31.3969 13.1749 31.405 13.1726 31.4134 13.1726C31.4217 13.1726 31.4299 13.1749 31.437 13.1792L47.8898 22.5859L44.98 24.2692L31.4449 16.4808L19.4414 23.527L23.6053 25.919L31.4527 21.3555L31.4567 21.3515L41.0445 26.8345L41.0406 35.9104L49.2128 40.5902L49.2109 40.728L31.4606 51.0915L15.0058 41.6966L17.8861 40.0094L31.4331 47.78L43.5468 40.6807V40.6827ZM34.0692 29.8546V29.7876L34.0673 29.7443L34.0653 29.7207L34.0613 29.6715V29.6557L34.0554 29.6026V29.5888L34.0476 29.5337V29.5238L34.0397 29.4667V29.4588L34.0298 29.3998L34.0279 29.3958L34.0161 29.3368L34.0141 29.3309L34.0003 29.2718V29.2679C33.9966 29.248 33.992 29.2283 33.9865 29.2088V29.2049L33.9688 29.1458L33.9511 29.0808C33.9406 29.0406 33.9274 29.0012 33.9117 28.9627L33.8881 28.9017C33.8809 28.8817 33.873 28.862 33.8645 28.8426L33.8389 28.7836L33.8133 28.7284L33.7857 28.6694L33.7582 28.6142L33.7267 28.5591C33.7159 28.5416 33.7054 28.5238 33.6952 28.506V28.504C33.685 28.4867 33.6745 28.4697 33.6637 28.4528L33.6617 28.4508C33.6511 28.4341 33.6399 28.4177 33.6282 28.4016V28.3977L33.5947 28.3504C33.5947 28.3504 33.5947 28.3465 33.5908 28.3465L33.5573 28.2992L33.5534 28.2953C33.5416 28.2796 33.5337 28.2638 33.5199 28.2481L33.518 28.2441L33.4806 28.1988L33.4766 28.1949L33.4412 28.1516L33.4372 28.1477L33.3979 28.1063C33.3979 28.1043 33.3979 28.1024 33.3939 28.1004L33.3565 28.0591C33.3549 28.0573 33.3535 28.0553 33.3526 28.0532L33.3152 28.0138C33.3001 27.9987 33.285 27.9836 33.2699 27.9685L33.264 27.9626L33.2246 27.9232L33.2207 27.9193L33.1813 27.8838L33.1734 27.8779L33.1321 27.8405L33.1262 27.8346C33.1128 27.823 33.099 27.8119 33.0848 27.8012L33.0789 27.7972L33.0356 27.7618L33.0297 27.7578L32.9844 27.7244L32.9785 27.7204L32.9333 27.687L32.9273 27.683L32.8821 27.6515L32.8762 27.6496L32.8289 27.6181L32.825 27.6141C32.8089 27.6037 32.7925 27.5939 32.7758 27.5846H32.7718L32.7206 27.5531H32.7167L32.6635 27.5216C32.0352 27.2562 31.3265 27.2442 30.6895 27.4879C30.0524 27.7317 29.5343 28.2124 29.2436 28.8294C28.9529 29.4465 28.9121 30.1521 29.1297 30.7985C29.3474 31.445 29.8066 31.9822 30.4113 32.2978L29.2694 37.5189H33.5888L32.4371 32.3017C33.4254 31.8883 34.0692 30.9236 34.0692 29.8546Z" fill="#3294DA" fill-opacity="0.98"/></g>
                            <defs>
                                <clipPath id="clip0_2_34">
                                    <rect width="63" height="63" fill="white" transform="translate(0 0.0378418)"/>
                                </clipPath>
                            </defs>
                            </svg>
                            <svg className='m-3' xmlns="http://www.w3.org/2000/svg" width="68" height="70" viewBox="0 0 68 70" fill="none">
                                <g clip-path="url(#clip0_2_36)">
                                <path d="M65.4861 37.9275H59.7022V64.0116H37.2095V53.1541L46.1744 44.0573L48.4559 44.4486C50.2455 44.4486 51.9618 43.7272 53.2273 42.4431C54.4928 41.159 55.2037 39.4174 55.2037 37.6015C55.2037 35.7855 54.4928 34.044 53.2273 32.7599C51.9618 31.4758 50.2455 30.7544 48.4559 30.7544C46.6662 30.7544 44.9499 31.4758 43.6844 32.7599C42.4189 34.044 41.708 35.7855 41.708 37.6015L42.0293 39.9165L37.2095 44.8724V27.0048C39.3302 25.8311 40.744 23.5813 40.744 20.9729C40.744 19.157 40.0331 17.4154 38.7677 16.1313C37.5022 14.8472 35.7859 14.1258 33.9962 14.1258C32.2066 14.1258 30.4902 14.8472 29.2248 16.1313C27.9593 17.4154 27.2484 19.157 27.2484 20.9729C27.2484 23.5813 28.6622 25.8311 30.783 27.0048V44.8724L25.9631 39.9165L26.2844 37.6015C26.2844 35.7855 25.5735 34.044 24.308 32.7599C23.0426 31.4758 21.3262 30.7544 19.5366 30.7544C17.7469 30.7544 16.0306 31.4758 14.7651 32.7599C13.4997 34.044 12.7887 35.7855 12.7887 37.6015C12.7887 39.4174 13.4997 41.159 14.7651 42.4431C16.0306 43.7272 17.7469 44.4486 19.5366 44.4486L21.818 44.0573L30.783 53.1541V64.0116H8.29019V37.9275H2.667C1.31743 37.9275 0 37.9275 0 37.2428C0.0321325 36.5255 1.3817 35.1561 2.7634 33.7541L30.783 5.32248C31.8433 4.24651 32.9358 3.13794 33.9962 3.13794C35.0566 3.13794 36.1491 4.24651 37.2095 5.32248L50.0625 18.3645V15.104H56.489V24.8855L65.4218 33.9497C66.7071 35.2539 68.0246 36.5907 68.0567 37.2754C68.0567 37.9275 66.7714 37.9275 65.4861 37.9275ZM19.5366 34.667C20.3036 34.667 21.0391 34.9762 21.5815 35.5265C22.1238 36.0768 22.4285 36.8232 22.4285 37.6015C22.4285 38.3798 22.1238 39.1261 21.5815 39.6765C21.0391 40.2268 20.3036 40.5359 19.5366 40.5359C18.7696 40.5359 18.034 40.2268 17.4917 39.6765C16.9493 39.1261 16.6446 38.3798 16.6446 37.6015C16.6446 36.8232 16.9493 36.0768 17.4917 35.5265C18.034 34.9762 18.7696 34.667 19.5366 34.667ZM48.4559 34.667C50.0625 34.667 51.3478 35.9712 51.3478 37.6015C51.3478 39.2317 50.0625 40.5359 48.4559 40.5359C47.6889 40.5359 46.9533 40.2268 46.4109 39.6765C45.8686 39.1261 45.5639 38.3798 45.5639 37.6015C45.5639 36.8232 45.8686 36.0768 46.4109 35.5265C46.9533 34.9762 47.6889 34.667 48.4559 34.667ZM33.9962 18.0385C35.6028 18.0385 36.8881 19.3427 36.8881 20.9729C36.8881 22.6032 35.6028 23.9074 33.9962 23.9074C32.3896 23.9074 31.1043 22.6032 31.1043 20.9729C31.1043 19.3427 32.3896 18.0385 33.9962 18.0385Z" fill="#3294DA" fill-opacity="0.98"/>
                                </g>
                            <defs>
                            <clipPath id="clip0_2_36">
                            <rect width="68" height="69" fill="white" transform="translate(0 0.0378418)"/>
                            </clipPath>
                            </defs>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="66" height="68" viewBox="0 0 66 68" fill="none">
                            <g clip-path="url(#clip0_2_38)">
                            <path d="M35.2633 1.44479L57.8316 10.0361C59.0609 10.5039 60.1203 11.3415 60.8681 12.437C61.6159 13.5324 62.0166 14.8335 62.0164 16.1663V33.7188C62.0165 39.1892 60.516 44.5515 57.6831 49.205C54.8501 53.8584 50.7966 57.6191 45.9768 60.0656L35.1633 65.5542C34.4917 65.8952 33.751 66.0728 33 66.0728C32.249 66.0728 31.5083 65.8952 30.8367 65.5542L20.0232 60.0656C15.2034 57.6191 11.1499 53.8584 8.31695 49.205C5.48399 44.5515 3.9835 39.1892 3.98361 33.7188V16.1663C3.98345 14.8335 4.38405 13.5324 5.13186 12.437C5.87968 11.3415 6.93907 10.5039 8.16842 10.0361L30.7367 1.44479C32.196 0.889496 33.804 0.889496 35.2633 1.44479ZM33 7.57492L10.4317 16.1663V33.7188C10.4324 37.9731 11.6001 42.1432 13.8038 45.7619C16.0075 49.3805 19.1602 52.3048 22.9087 54.2071L33 59.3357L43.0913 54.2136C46.8408 52.3108 49.9942 49.3855 52.1979 45.7656C54.4017 42.1457 55.5688 37.9742 55.5683 33.7188V16.1663L33 7.57492ZM33 20.4439C34.3762 20.4434 35.7165 20.8898 36.8249 21.7179C37.9333 22.5461 38.7516 23.7125 39.1601 25.0466C39.5686 26.3807 39.546 27.8126 39.0954 29.1326C38.6449 30.4527 37.7901 31.5919 36.6561 32.3834L36.224 32.6616V43.3542C36.2231 44.1884 35.9085 44.9907 35.3444 45.5973C34.7803 46.2039 34.0093 46.5689 33.1889 46.6178C32.3686 46.6667 31.5609 46.3958 30.9307 45.8603C30.3006 45.3249 29.8956 44.5655 29.7985 43.7371L29.776 43.3542V32.6616C28.5452 31.9419 27.5829 30.8296 27.0387 29.4977C26.4944 28.1658 26.3987 26.6888 26.7662 25.2959C27.1338 23.9031 27.9441 22.6724 29.0713 21.7951C30.1985 20.9177 31.5796 20.4427 33 20.4439Z" fill="#3294DA" fill-opacity="0.98"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_2_38">
                            <rect width="66" height="67" fill="white" transform="translate(0 0.0378418)"/>
                            </clipPath>
                            </defs>
                            </svg>
                        </div>
                    </div>
                    
                </div>
                <div className='col-6'>
                    <img src={dummy} className='img-fluid mx-5'/>
                </div>
            </div>
            <div className='row container m-5 position-relative'>
                        <div className='col-6 bg-secondary-subtle text-center '>
                            <div className='row'>
                                <div className='col m-5 mx-0'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="71" viewBox="0 0 70 71" fill="none">
                                     <path d="M61.25 23.6666C62.7971 23.6666 64.2808 24.2899 65.3748 25.3995C66.4688 26.5091 67.0834 28.014 67.0834 29.5832V41.4166C67.0834 42.9858 66.4688 44.4907 65.3748 45.6003C64.2808 46.7099 62.7971 47.3332 61.25 47.3332H58.1525C57.4415 53.0526 54.697 58.3121 50.4343 62.1249C46.1715 65.9376 40.6835 68.0415 35 68.0416V62.1249C39.6413 62.1249 44.0925 60.2548 47.3744 56.9261C50.6563 53.5973 52.5 49.0825 52.5 44.3749V26.6249C52.5 21.9173 50.6563 17.4025 47.3744 14.0738C44.0925 10.745 39.6413 8.87491 35 8.87491C30.3587 8.87491 25.9075 10.745 22.6257 14.0738C19.3438 17.4025 17.5 21.9173 17.5 26.6249V47.3332H8.75002C7.20292 47.3332 5.71919 46.7099 4.62523 45.6003C3.53127 44.4907 2.91669 42.9858 2.91669 41.4166V29.5832C2.91669 28.014 3.53127 26.5091 4.62523 25.3995C5.71919 24.2899 7.20292 23.6666 8.75002 23.6666H11.8475C12.5593 17.9478 15.304 12.689 19.5667 8.87691C23.8294 5.06481 29.317 2.96143 35 2.96143C40.683 2.96143 46.1707 5.06481 50.4333 8.87691C54.696 12.689 57.4408 17.9478 58.1525 23.6666H61.25ZM22.6334 46.6972L25.725 41.6799C28.5048 43.4461 31.7198 44.3803 35 44.3749C38.2802 44.3803 41.4952 43.4461 44.275 41.6799L47.3667 46.6972C43.6604 49.0525 39.3737 50.2984 35 50.2916C30.6263 50.2985 26.3396 49.0526 22.6334 46.6972Z" fill="#3294DA" fill-opacity="0.98"/>
                                    </svg>
                                </div>
                                <div className='col m-5'>
                                    <div className='row fs-3 home-heading'>
                                        1800 -100-100
                                    </div>
                                    <div className='row home-para fs-6'>
                                        Provide information on recognizing abuse
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="home-circular-div position-absolute top-50 start-50 translate-middle z-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="51" viewBox="0 0 50 51" fill="none">
                                    <path d="M41.2083 4.82422L50 13.6159L17.5833 46.0742L0 28.4701L8.79167 19.6784L17.5833 28.4701L41.2083 4.82422ZM41.2083 10.6576L17.5833 34.3242L8.79167 25.6367L5.85417 28.4701L17.5833 40.1784L44.1458 13.6159L41.2083 10.6576Z" fill="#3696DB"/>
                                </svg>
                                </div>
                        
                        <div className='col-6 text-start bg-theme text-white position-relative'>
                            <div className='row'>
                                <div className='col-sm m-3'>
                                    <p className='m-4 text-white fs-5 text-start home-heading'>Name</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm m-3'>
                                    <p className='m-4 text-white fs-6 text-start home-para'>Happy Survivor</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
        </div>
    </div>
  )
}

export default Home