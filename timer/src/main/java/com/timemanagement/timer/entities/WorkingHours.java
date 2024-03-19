package com.timemanagement.timer.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "WORKING_HOURS")
public class WorkingHours {
 
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "working_hours_id_seq")
    @SequenceGenerator(name = "working_hours_id_seq", sequenceName = "working_hours_id_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "START_TIME")
    private LocalDateTime startTime;

    @Column(name = "END_TIME")
    private LocalDateTime endTime;
}
