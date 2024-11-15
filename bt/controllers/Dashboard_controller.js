class CvController {
  static detail(req, res) {
    console.log(req.params);
    res.render("Dashboard", { title: "Home Page"});
  }
}


export default CvController;