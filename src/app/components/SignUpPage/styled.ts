import styled from 'styled-components';
import { device } from 'styles/devices';

export const FieldsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  text-align: initial;
  margin: 10px 0;
`;

export const QuestionPairs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
  ${device.mobileL} {
    flex-direction: column;
    margin: 0;
    .question-pair-item {
      margin: 10px 0;
    }
  }
`;
