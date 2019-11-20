import styled from 'styled-components';

export default styled.div`
  padding: 0.5em 0;
  clear: both;
  overflow: hidden;

  figure {
    width: 50px;
    height: 1.5em;
    background-color: ${props => props.bg};
    display: inline-block;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
    margin: 0;
    margin-right: 1em;
    float: left;
  }

  span {
    width: 90px;
    line-height: 1.5em;
    display: inline-block;
    float: left;
  }

  b {
    line-height: 1.5em;
    display: inline-block;
    float: left;
  }
`;