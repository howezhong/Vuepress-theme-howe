<template>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="192" height="90" viewBox="0 0 204.8 128">
    <g transform="scale(0.4,0.4)">
      <g>
        <rect />
      </g>
      <g transform="translate(0,0)">
        <g transform="scale(1,-1) translate(0,-234)">
          <path stroke="none" :fill="color"
            d="M143 231Q155 216 176 216L179 213V210Q120 157 119 147L134 150L140 144Q132 121 107 99V54L104 51L107 48V33L101 24V18H104Q113 18 128 51Q164 63 164 117L194 201L215 189L188 99H191L209 105H215Q220 105 230 81L227 78V75L230 66L224 57L227 54V51L200 -30L188 -39H176Q157 -24 155 -9Q145 -10 119 -60L116 -63H113L110 -60H107L140 30L125 33V15Q125 9 59 -45H53Q37 -45 35 -36L71 0L62 12L68 21Q56 21 56 30V39L71 63L68 66H65L59 60H44L38 66V72Q40 90 47 90H50L68 75Q75 90 83 90V105L68 96H56V99Q89 123 89 147Q60 145 32 111L20 105L14 111V117Q32 143 59 150V153L50 180L53 183H56L80 165Q101 165 128 228L131 231H143ZM161 9L179 -6Q179 6 209 81V87H206Q161 39 161 9Z" />
        </g>
      </g>
      <g transform="translate(256,0)">
        <g transform="scale(1,-1) translate(0,-234)">
          <path stroke="none" :fill="color"
            d="M202 211Q226 207 226 187V184Q225 167 127 91Q127 82 118 82L115 79V76Q140 76 142 40L139 31L175 40H187L196 31V28L166 1L172 -17V-26Q153 -47 136 -47L118 -41L109 -50H94V-44L103 -32L91 -20V-17Q91 -5 109 13V46H103Q92 37 82 37L79 40V61Q138 123 166 163V166L130 142L133 121L121 112H112Q79 132 76 145Q76 156 124 169Q170 211 202 211ZM82 124Q63 64 31 64L13 82V88L82 124ZM124 -11V-14H127L133 -8V-5H130L124 -11Z" />
        </g>
      </g>
    </g>
  </svg>
</template>
<script>
export default {
  name: 'zLogo',
  props: {
    color: {
      type: String,
      default: '#cfaef9'
    }
  }
}
</script>
