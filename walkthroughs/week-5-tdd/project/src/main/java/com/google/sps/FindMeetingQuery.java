// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    // Sort list by events.
    ArrayList<Event> eventList = new ArrayList(events);
    Collections.sort(eventList, (Event e1, Event e2) -> TimeRange.ORDER_BY_START.compare(e1.getWhen(), e2.getWhen()));
    
    Collection<TimeRange> optionalIncludedOpenTimes = getOpenTimes(eventList, request, /* optionalAttendees= */ true);
    Collection<TimeRange> requiredOpenTimes = getOpenTimes(eventList, request, /* optionalAttendees= */ false);

    if (optionalIncludedOpenTimes.size() > 0) {
      return optionalIncludedOpenTimes;
    } 
    else if (request.getAttendees().size() > 0) {
      return requiredOpenTimes;
    } 
    else {
      return Collections.emptyList();
    }
  }

  /**
   * A helper method that will get all the open times in a day for a meeting to occur.
   * @param events All the events happening in the day.
   * @param request The meeting request that will be scheduled sometime in the day.
   * @param optionalAttendees A choice on whether to schedule around optional attendees as well.
   * @return A list of all the possible times the meeting request can be scheduled.
   */
  private Collection<TimeRange> getOpenTimes(Collection<Event> events, MeetingRequest request, boolean optionalAttendees){
    ArrayList<TimeRange> openTimes = new ArrayList<TimeRange>();

    // Edge case when a meeting is longer than a full day.
    if (request.getDuration() > TimeRange.WHOLE_DAY.duration()){
      return openTimes;
    }
    
    int dayStart = TimeRange.START_OF_DAY;

    for (Event event: events) {
      // Ignore the event if no required members are in it.
      boolean noRequiredMembers = Collections.disjoint(event.getAttendees(), request.getAttendees());
      boolean noOptionalMembers = Collections.disjoint(event.getAttendees(), request.getOptionalAttendees());

      if (optionalAttendees){
        if (noRequiredMembers && noOptionalMembers){
          continue;
        }     
      }
      else if (noRequiredMembers) {
        continue;
      }

      if (dayStart < event.getWhen().start()) {
        // If the meeting can happen before the event starts, add it.
        if (dayStart + request.getDuration() <= event.getWhen().start()) {
          openTimes.add(TimeRange.fromStartEnd(dayStart, event.getWhen().start(), false));
        }

        // Move start pointer to after the event too keep track of an open time.
        dayStart = event.getWhen().end();
        
      } 
      // If the start pointer is in the middle of the event (for overlap), move the start pointer to after the event.
      else if (dayStart < event.getWhen().end()) {
        dayStart = event.getWhen().end();
      }
    }

    // If there is time for the meeting after all of the events, add that time.
    if (dayStart + request.getDuration() <= TimeRange.END_OF_DAY) {
      openTimes.add(TimeRange.fromStartEnd(dayStart, TimeRange.END_OF_DAY, true));
    }

    return openTimes;
  }

}
