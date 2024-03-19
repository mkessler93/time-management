package com.timemanagement.timer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.timemanagement.timer.entities.WorkingHours;

@Repository
public interface TimeRepository extends JpaRepository<WorkingHours,Long>{
    @Query( value = "SELECT * FROM working_hours WHERE CAST(start_time AS VARCHAR) LIKE CONCAT(:date, '%') Order By ID ASC", nativeQuery = true)
    List<WorkingHours> findEntriesFromCurrentDate(String date);  
}
