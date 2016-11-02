export default `
  html
  {
    height: 100%;
  }

  body
  {
    padding: 0;
    margin: 0;
    height: 100%;
    min-height: 300px;
    color: #333;
    background: #fff;
  }

  body,
  input,
  button
  {
    font: normal 13px/1.5 "Proxima Nova", Arial, Helvetica, Geneva, sans-serif;
  }

  header
  {
    text-align: center;
  }

  .input
  {
    box-sizing: border-box;
    width: 100%;
    padding: 8px 10px;
    line-height: 1;
    border-radius: 5px;
    border: 1px solid #d3d3d3;
    transition: all 0.3s ease-in-out;
  }

  .input:focus
  {
    outline: none;
    border-color: #007cff;
  }

  .container
  {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 310px;
    margin: 0 auto;
  }

  .logo
  {
    width: 180px;
  }

  .form
  {
    margin-top: 20px;
  }

  .title
  {
    margin-bottom: 10px;
  }

  .tab
  {
    font-weight: bold;

    display: inline-block;
    box-sizing: border-box;

    width: 50%;
    padding: 10px;

    cursor: pointer;
    color: #007cff;
    line-height: 1;
    text-align: center;
    border: 1px solid #007cff;

    transition: all 0.3s ease-in-out;
  }

  .tab_left
  {
    border-right: 0;
    border-radius: 5px 0 0 5px
  }

  .tab_right
  {
    border-left: 0;
    border-radius: 0 5px 5px 0
  }

  .tab_selected
  {
    background: #007cff;
    color: #fff;
  }

  .host
  {
    height: 0;
    position: relative;
    overflow: hidden;
    margin-top: 20px;
    transition: height 0.3s ease-in-out;
  }

  .host_expanded
  {
    height: 80px;
  }

  .host__label
  {
    display: block;
  }

  .submit-btn
  {
    font-weight: bold;

    box-sizing: border-box;
    width: 100%;
    padding: 10px;

    line-height: 1;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    color: #fff;
    background: #6ab700;
    transition: all 0.3s ease-in-out;
  }

  .submit-btn:hover,
  .submit-btn:active,
  .submit-btn:focus
  {
    outline: none;
    background: #9ede45;
  }
`
