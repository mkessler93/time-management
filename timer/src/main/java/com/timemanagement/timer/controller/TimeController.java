package com.timemanagement.timer.controller;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.coyote.BadRequestException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.timemanagement.timer.DTO.AllreadyWorkedHoursDTO;
import com.timemanagement.timer.entities.WorkingHours;
import com.timemanagement.timer.repository.TimeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class TimeController {
    
    // TODO: move the business logic to a service class

    private final TimeRepository timeRepository;

    @GetMapping("/time")
    public WorkingHours getTime() {
        List<WorkingHours> hours = timeRepository.findAll();
        log.error("Entries in table WORKING_HOURS: " + hours.size());
        return hours.get(0);
    }

    @PostMapping("/start")
    @Transactional
    public long startingHours() {

        WorkingHours startTime = WorkingHours.builder().startTime(LocalDateTime.now()).build();
        timeRepository.save(startTime);

        return startTime.getId();
    }
    
    @PostMapping("/stop/{id}")
    @Transactional
    public void endingHours(@PathVariable long id) throws BadRequestException {
        Optional<WorkingHours> hoursOptional = timeRepository.findById(id);
        
        LocalDateTime endTime = LocalDateTime.now();

        if(!hoursOptional.isPresent()){
            log.error("Can't find any existing entry/row!");
            throw new BadRequestException("Can't find entry!");
        }

        // throw an error if the endTime value is allready set 
        if(hoursOptional.get().getEndTime() != null){
            log.error("endTime value is already set!");
            throw new BadRequestException("Value is already set!");
        }

        WorkingHours workingHours = hoursOptional.get();
        workingHours.setEndTime(endTime);
        
        timeRepository.save(workingHours);                
    }
    
    @GetMapping("/allHours")
    public AllreadyWorkedHoursDTO getAllHoursOfDay(@RequestParam String date) {
        List<WorkingHours> workingHours = timeRepository.findEntriesFromCurrentDate(date);
        LocalDateTime now = LocalDateTime.now();
        Boolean startPressed = false;

        if(!workingHours.isEmpty()){
            // Sum up every entry that has a startTime AND endTime
            List<Long> hoursInMS = workingHours.stream().filter(e -> e.getEndTime() != null && e.getStartTime() != null)
                .map(e -> (ChronoUnit.MILLIS.between(e.getStartTime(), e.getEndTime()))).collect(Collectors.toList());
            
            long diffLatestEntryHours = 0L;
            // Calculate the difference from the latest entry that has no endTime to now.
            // This could occure if the Start button is pressed and the browser/tab gets
            // closed.
            if(workingHours.get(workingHours.size() - 1).getEndTime() == null){
                diffLatestEntryHours = ChronoUnit.MILLIS.between(workingHours.get(workingHours.size() - 1).getStartTime(), now);
                startPressed = true;
            }
            long workingHoursInSec = (hoursInMS.stream().collect(Collectors.summingLong(Long::longValue)) + diffLatestEntryHours)/1000 ;
            return AllreadyWorkedHoursDTO.builder().id(workingHours.get(workingHours.size() - 1).getId())
                    .hoursInSec(workingHoursInSec).startPressed(startPressed).build();
        }

        return AllreadyWorkedHoursDTO.builder().id(null).hoursInSec(0).startPressed(startPressed).build();
    }
}
