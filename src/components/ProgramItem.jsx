import {
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramImage,
  ProgramStack,
  ProgramText,
  ProgramTitle,
  useProgram,
} from "planby";

export const ProgramItem = ({ program, onClick, ...rest }) => {
  const { styles, formatTime, set12HoursTimeFormat, isLive, isMinWidth } =
    useProgram({
      program,
      ...rest,
    });

  const { data } = program;
  const { image, title, since, till } = data;

  const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase();
  const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase();

  return (
    <ProgramBox
      width={styles.width}
      style={styles.position}
      onClick={() => onClick(data, isLive)}
    >
      <ProgramContent width={styles.width} isLive={isLive}>
        <ProgramFlex>
          {/* {isLive && isMinWidth && <ProgramImage src={image} alt="Preview" width={'100%'}/>} */}
          <ProgramStack>
            <ProgramTitle>{title}</ProgramTitle>
            <ProgramText>
              {sinceTime} - {tillTime}
            </ProgramText>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
};
