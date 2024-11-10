function generateChart(company) {
    return `<iframe
  referrerpolicy="origin"
  width="100%"
  height="470"
  style="background: #FFFFFF;padding: 10px; border: none; border-radius: 5px; box-shadow:0 2px 4px 0 rgba(0,0,0,.2)"
  src="https://jika.io/embed/area-chart?symbol=${company}&selection=one_year&closeKey=close&boxShadow=true&graphColor=1652f0&textColor=161c2d&backgroundColor=FFFFFF&fontFamily=Nunito"
></iframe>`
}

export default generateChart;