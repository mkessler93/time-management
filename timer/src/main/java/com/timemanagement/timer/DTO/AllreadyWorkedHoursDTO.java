package com.timemanagement.timer.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class AllreadyWorkedHoursDTO {
    Integer id;
    long hoursInSec;
    Boolean startPressed;
}
