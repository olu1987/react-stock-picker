import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const DatePickerRowStyled = styled.div`
  display: flex;
  width: 100%^;
`;

export const DatePickerWrapperStyled = styled.div`
  width: 300px;
  padding: 20px 20px 0 0;

  .react-datepicker-wrapper {
    width: 100%;
  }
`;


export const DatePickerStyled = styled(DatePicker)`
  width: 100%;
  border-radius: 4px 4px 0 0;
  border-width: 0 0 2px 0;
  cursor: default;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: 40px;
  outline: 0 !important;
  position: relative;
  -webkit-transition: all 100ms;
  transition: all 100ms;
  box-sizing: border-box;
  padding: 12px;
 
  input {
    height: 40px;
    width: 100%;
  }
`;
