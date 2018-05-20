package com.erp.app.config.dbmigrations;

import com.erp.app.domain.Authority;
import com.erp.app.domain.IssueType;
import com.erp.app.domain.IssuePriority;
import com.erp.app.domain.Category;
import com.erp.app.security.AuthoritiesConstants;
import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.springframework.data.mongodb.core.MongoTemplate;

@ChangeLog(order = "002")
public class OtherInitialSetupMigration {

    @ChangeSet(order = "03", author = "initiator", id = "03-addOtherAuthorities")
    public void addAuthorities(MongoTemplate mongoTemplate) {
        Authority managerAuthority = new Authority();
        managerAuthority.setName(AuthoritiesConstants.MANAGER);
        Authority employeeAuthority = new Authority();
        employeeAuthority.setName(AuthoritiesConstants.EMPLOYEE);
        mongoTemplate.save(managerAuthority);
        mongoTemplate.save(employeeAuthority);
    }

    @ChangeSet(order = "04", author = "initiator", id = "04-addTypes")
    public void addTypes(MongoTemplate mongoTemplate) {
        IssueType bug = new IssueType();
        bug.setId("type-1");
        bug.setCode("BUG");
        bug.setName("Bug");
        bug.setIcon("https://image.ibb.co/hnFfvS/Bug.png");
        bug.setDescription("A problem which prevents the functions of the product");
        mongoTemplate.save(bug);

        IssueType feature = new IssueType();
        feature.setId("type-2");
        feature.setCode("FTR");
        feature.setName("Feature");
        feature.setIcon("https://image.ibb.co/g5V29n/Feature.png");
        feature.setDescription("A distinct element of functionality which can provide capabilities to the business");
        mongoTemplate.save(feature);

        IssueType improvement = new IssueType();
        improvement.setId("type-3");
        improvement.setCode("IMPV");
        improvement.setName("Improvement");
        improvement.setIcon("https://image.ibb.co/bw5DFS/Improvement.png");
        improvement.setDescription("An act of improving the quality of an existing task or feature");
        mongoTemplate.save(improvement);

        IssueType story = new IssueType();
        story.setId("type-4");
        story.setCode("STR");
        story.setName("Story");
        story.setIcon("https://image.ibb.co/jm0fvS/Story.png");
        story.setDescription("A small aspect of a feature which you can use to get feedback from your stakeholders and find out if you're doing anything wrong.");
        mongoTemplate.save(story);

        IssueType sync = new IssueType();
        sync.setId("type-5");
        sync.setCode("SYNC");
        sync.setName("Synchronization");
        sync.setIcon("https://image.ibb.co/cuxSaS/Synchronization.png");
        sync.setDescription("An effort to ensure that once an issue is released, it does not fall out of harmony with its source.");
        mongoTemplate.save(sync);

        IssueType task = new IssueType();
        task.setId("type-6");
        task.setCode("TSK");
        task.setName("Task");
        task.setIcon("https://image.ibb.co/eyB9pn/Task.png");
        task.setDescription("A unit of work contained within a story.");
        mongoTemplate.save(task);
    }

    @ChangeSet(order = "05", author = "initiator", id = "05-addPriorities")
    public void addPriorities(MongoTemplate mongoTemplate) {
        IssuePriority high = new IssuePriority();
        high.setId("priority-1");
        high.setCode("1");
        high.setName("High");
        high.setColor("#be3232");
        mongoTemplate.save(high);

        IssuePriority medium = new IssuePriority();
        medium.setId("priority-2");
        medium.setCode("2");
        medium.setName("Medium");
        medium.setColor("#bc7a21");
        mongoTemplate.save(medium);

        IssuePriority low = new IssuePriority();
        low.setId("priority-3");
        low.setCode("3");
        low.setName("Low");
        low.setColor("#538e20");
        mongoTemplate.save(low);
    }

    @ChangeSet(order = "06", author = "initiator", id = "06-addStatusCategory")
    public void addStatusCategory(MongoTemplate mongoTemplate) {
        Category todo = new Category();
        todo.setId("category-1");
        todo.setCode("NEW");
        todo.setName("To Do");
        todo.setColor("#da3f0e");
        mongoTemplate.save(todo);

        Category doing = new Category();
        doing.setId("category-2");
        doing.setCode("DOING");
        doing.setName("Doing");
        doing.setColor("#dc9a19");
        mongoTemplate.save(doing);

        Category done = new Category();
        done.setId("category-3");
        done.setCode("DONE");
        done.setName("Done");
        done.setColor("#488a08");
        mongoTemplate.save(done);
    }
}
