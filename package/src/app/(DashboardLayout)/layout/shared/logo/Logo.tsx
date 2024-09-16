import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="350%" height="350%" viewBox="0 0 3240 615" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0,350) scale(0.1,-0.1)" fill="#0433ff" stroke="none"> 
          <path d="M1980 6277 c-11 -26 -81 -218 -156 -427 l-137 -380 -298 -6 c-214 -4 -313 2 -347 20 -39 21 -50 21 -57 1 -6 -19 -89 -25 -325 -25 l-317 0 -42 128 c-64 193 -79 196 -199 45 -56 -71 -102 -139 -102 -151 0 -47 61 -18 122 58 75 93 89 97 106 32 6 -27 17 -63 24 -80 10 -25 -1 -32 -50 -32 -34 0 -62 -9 -62 -20 0 -11 32 -20 71 -20 38 0 74 -11 79 -25 4 -14 85 -238 179 -499 94 -261 171 -477 171 -480 0 -3 -112 -3 -250 0 -216 5 -250 2 -250 -25 0 -42 2301 -38 2315 4 7 20 -107 25 -525 25 -427 0 -532 5 -526 26 3 14 83 239 176 500 l170 474 355 0 c223 0 355 7 355 20 0 13 -129 20 -347 20 l-346 0 129 360 130 359 110 -264 c157 -381 149 -375 267 -157 74 137 88 154 110 125 46 -63 78 2 44 91 -27 72 -33 76 -116 76 -94 0 -138 -44 -63 -64 52 -13 52 -13 -18 -146 l-57 -110 -57 129 c-215 494 -225 510 -266 418z m-1028 -892 c-6 -19 -66 -215 -132 -435 -67 -220 -123 -408 -126 -418 -3 -10 -49 103 -102 250 -53 147 -127 351 -163 453 l-67 185 300 0 c277 0 300 -3 290 -35z m708 23 c0 -6 -62 -184 -137 -395 -76 -211 -147 -410 -158 -443 -14 -41 -24 -51 -31 -30 -27 73 -254 843 -254 860 0 12 114 20 290 20 160 0 290 -5 290 -12z m-509 -531 c71 -235 129 -433 129 -441 0 -8 -122 -17 -270 -20 -149 -3 -270 -3 -270 1 0 3 40 134 88 290 48 156 108 357 133 448 25 91 49 162 54 157 4 -4 66 -200 136 -435z"/> 
          <path d="M8320 4960 l0 -582 75 6 75 6 -7 185 c-10 242 32 254 187 53 172 -223 200 -248 279 -248 92 0 97 -11 -99 225 -93 113 -167 211 -165 219 3 8 75 91 161 185 l157 171 -80 0 c-75 0 -90 -11 -227 -160 -217 -237 -222 -233 -213 175 l7 335 -75 6 -75 6 0 -582z"/> 
          <path d="M5510 5500 c-282 -58 -440 -259 -438 -560 1 -359 193 -549 555 -551 l196 -1 100 -114 c98 -111 103 -114 203 -114 l103 0 -148 149 -148 149 81 88 c368 399 19 1061 -504 954z m220 -142 c329 -92 370 -680 57 -811 -292 -121 -557 66 -555 393 1 319 213 497 498 418z"/> 
          <path d="M7208 5470 c-42 -65 4 -150 82 -150 78 0 124 85 82 150 -20 31 -52 50 -82 50 -30 0 -62 -19 -82 -50z"/> 
          <path d="M3480 4940 l0 -560 80 0 80 0 0 240 0 240 231 0 232 0 -7 65 -6 65 -225 -4 -225 -3 0 193 0 194 270 -6 270 -6 0 71 0 71 -350 0 -350 0 0 -560z"/> 
          <path d="M4261 5165 c0 -8 58 -95 129 -193 l128 -179 -112 -161 c-62 -89 -125 -176 -139 -194 -42 -49 -32 -61 48 -54 69 6 84 19 187 171 l112 164 104 -169 c102 -167 105 -170 183 -170 100 0 103 -13 -59 219 l-138 197 128 181 c150 212 148 203 57 203 -66 0 -77 -10 -173 -159 l-103 -159 -100 159 c-96 154 -102 159 -176 159 -42 0 -77 -7 -76 -15z"/> 
          <path d="M6320 4905 c0 -422 41 -506 255 -521 103 -7 124 -1 199 53 l83 61 7 -54 c5 -42 18 -55 61 -60 l55 -7 0 402 0 401 -70 0 -70 0 0 -298 0 -299 -67 -41 c-90 -56 -214 -56 -265 0 -34 38 -38 75 -38 340 l0 298 -75 0 -75 0 0 -275z"/> 
          <path d="M7220 4780 l0 -400 70 0 70 0 0 400 0 400 -70 0 -70 0 0 -400z"/> 
          <path d="M7750 5152 c-272 -121 -278 -603 -9 -743 160 -82 513 26 412 127 -29 29 -40 30 -77 6 -205 -128 -376 -20 -376 238 0 241 133 349 326 264 100 -44 213 5 133 58 -124 83 -289 103 -409 50z"/>        
        </g>
      </svg> 
    </LinkStyled>
  );
};

export default Logo;