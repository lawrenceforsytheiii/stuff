// @flow
import styled from 'styled-components';
import { Colors } from '@lawrence/ui-lib';

export const ColorsWrapper = styled.div`
  text-align: center;
  margin-bottom: 3em;

  figure {
    padding-bottom: 100%;
    background-color: ${(props) => props.bg};
    display: block;
    margin: 0;
    box-shadow: ${(props) => props.elevation};
    border-radius: 50%;
  }

  b {
    display: block;
    padding: 8px;
  }

  small {
    display: block;
    height: 40px;
    margin-top: -50%;
    padding-bottom: calc(50% - 32px);
  }
`;

export const Comment = styled.div`
  color: ${Colors.grey_blue_3};
  margin-bottom: 25px;
`;

export const DarkBgWrapper = styled.div`
  background-color: ${Colors.black};
  color: ${Colors.white};
  padding: 32px 16px 0 16px;

  code {
    background-color: ${Colors.white_5};
    color: ${Colors.grey_blue_5};
  }
`;
