package io.github.prestacao.servico.infrastructure.util;

import java.lang.reflect.Field;
import java.util.List;

import javax.persistence.Embedded;
import javax.validation.constraints.Null;

import org.apache.commons.lang3.ArrayUtils;

public class BeanUtils {

    public static void copyProperties(Object source, Object target) {
        if(source == null) {
            return;
        }
        deepCopyProperties(source, target);
        org.springframework.beans.BeanUtils.copyProperties(source, target, getNullProperties(source));
    }

    public static void copyProperties(Object source, Object target, String... ignoreProperties) {
        deepCopyProperties(source, target);
        org.springframework.beans.BeanUtils.copyProperties(source, target,
                ArrayUtils.addAll(getNullProperties(source), ignoreProperties));
    }

    private static void deepCopyProperties(Object source, Object target) {
        if(source == null) {
            return;
        }
        List<Field> sourceFields = FieldUtils.getAllFields(source.getClass());

        for (Field sourceField : sourceFields) {
            Embedded embedded = sourceField.getAnnotation(Embedded.class);

            if (embedded != null) {
                sourceField.setAccessible(true);

                try {
                    Field targetField = FieldUtils.getField(target.getClass(), sourceField.getName());
                    targetField.setAccessible(true);
                    
                    Object targetEmbedded = getTargetEmbedded(target, targetField);
                    copyProperties(sourceField.get(source), targetEmbedded);
                    sourceField.set(source, targetEmbedded);
                } catch (NoSuchFieldException | IllegalArgumentException | IllegalAccessException exception) {
                    throw new IllegalArgumentException();
                }
            }
        }
    }

    private static String[] getNullProperties(Object source) {
        return FieldUtils.getAllFields(source.getClass()).stream().filter(field -> StreamUtils.propagate(() -> {
            Null nullConstraint = field.getAnnotation(Null.class);

            if (nullConstraint != null) {
                return false;
            }

            field.setAccessible(true);

            return field.get(source) == null;
        })).map(Field::getName).toArray(String[]::new);
    }
    
    private static Object getTargetEmbedded(Object target, Field targetField) {
        Object targetEnum = null;
        try {
            targetEnum = targetField.get(target);
            if(targetEnum == null) {
                targetEnum = Class.forName(targetField.getType().getName()).newInstance();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return targetEnum;
    }

}