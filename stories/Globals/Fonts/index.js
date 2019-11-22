import React from 'react';
import styled from 'styled-components';
import { Fonts, Colors } from '@lawrence/ui-lib';
import StoryContainer from '../../Utils/StoryContainer';

const OuterWrapper = styled.div`
  display: inline-block;
  max-width: 50%;
  padding: 20px 0px;
`;

const ContentWrapper = styled.div`
  display: flex;
  padding: 20px 0;
`;

const Description = styled.ul`
  ${Fonts.body};
    list-style: none;
    display: inline-block;
    padding-left: 10px;
    margin: 0;
    max-width: 50%;
`;

const HeadlineLarge = styled.div`
  ${Fonts.headline_large};
  display: inline-block;
  width: 202px;
  word-break: break-all;
`;

const Headline = styled.div`
  ${Fonts.headline};
  display: inline-block;
  width: 202px;
  word-break: break-all;
  vertical-align: top;
  text-align: right;
`;

const Subhead = styled.div`
  ${Fonts.subhead};
  display: inline-block;
  width: 202px;
  word-break: break-all;
  vertical-align: top;
  text-align: right;
`;

const SubheadSmall = styled.div`
  ${Fonts.subhead_small};
  display: inline-block;
  width: 202px;
  word-break: break-all;
  vertical-align: top;
  text-align: right;
`;

const Body = styled.div`
  ${Fonts.body};
  display: inline-block;
  width: 202px;
  word-break: break-all;
  vertical-align: top;
  text-align: right;
`;

const BodySmall = styled.div`
  ${Fonts.body_small};
  display: inline-block;
  width: 202px;
  word-break: break-all;
  vertical-align: top;
  text-align: right;
`;

const Link = styled.a`
  ${Fonts.link};
  display: inline-block;
  width: 202px;
  word-break: break-all;
  vertical-align: top;
  text-align: right;
  cursor:pointer;

  &:hover {
    color: ${Colors.accent_dark}
  }
`;

const LinkSecondary = styled.a`
  ${Fonts.link_secondary};
  display: inline-block;
  width: 202px;
  word-break: break-all;
  vertical-align: top;
  text-align: right;
  cursor: pointer;

  &:hover {
    color: ${Colors.accent_dark}
  }
`;

const Caption = styled.div`
  ${Fonts.caption};
  display: inline-block;
  width: 202px;
  word-break: break-all;
  vertical-align: top;
  text-align: right;
`;


const FontsStory = () => (
    <StoryContainer style={{display:'flex'}}>
      <OuterWrapper>
        <ContentWrapper>
          <HeadlineLarge>headline_large</HeadlineLarge>
          <Description>
              <li>font family = Capisce</li>
              <li>font size = 48px</li>
              <li>line height = 52px</li>
              <li>color = grey_blue_5</li>
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <Headline>headline</Headline>
          <Description>
              <li>font family = Capisce</li>
              <li>font size = 24px</li>
              <li>line height = 28px</li>
              <li>color = grey_blue_5</li>
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <Subhead>subhead</Subhead>
          <Description>
              <li>font family = Inter UI</li>
              <li>font weight = medium (500)</li>
              <li>font size = 20px</li>
              <li>line height = 24px</li>
              <li>color = grey_blue_5</li>
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <SubheadSmall>subhead_small</SubheadSmall>
          <Description>
              <li>font family = Inter UI</li>
              <li>font weight = medium (600)</li>
              <li>font size = 16px</li>
              <li>line height = 24px</li>
              <li>color = grey_blue_5</li>
          </Description>
        </ContentWrapper>
      </OuterWrapper>
      <OuterWrapper>
        <ContentWrapper>
          <Body>body</Body>
          <Description>
              <li>font family = Inter UI</li>
              <li>font size = 16px</li>
              <li>line height = 24px</li>
              <li>color = grey_blue_5</li>
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <BodySmall>body_small</BodySmall>
          <Description>
              <li>font family = Inter UI</li>
              <li>font size = 14px</li>
              <li>line height = 22px</li>
              <li>color = grey_blue_4</li>
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <Link>link</Link>
          <Description>
              <li>font family = Inter UI</li>
              <li>font weight = medium</li>
              <li>font size = 16px</li>
              <li>line height = 24px</li>
              <li>color = accent (and accent_dark on hover)</li>
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <LinkSecondary>link_secondary</LinkSecondary>
          <Description>
              <li>font family = Inter UI</li>
              <li>font weight = medium</li>
              <li>font size = 16px</li>
              <li>line height = 24px</li>
              <li>color =  grey_blue_5 (and accent_dark on hover)</li>
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <Caption>caption</Caption>
          <Description>
              <li>font family = Inter UI</li>
              <li>font size = 12px</li>
              <li>line height = 18px</li>
              <li>color = grey_blue_4</li>
          </Description>
        </ContentWrapper>
      </OuterWrapper>
    </StoryContainer>
);

export default FontsStory;
